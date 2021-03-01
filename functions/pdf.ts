import middy from "@middy/core";
import chromium from "chrome-aws-lambda";
import { APIGatewayEvent } from "aws-lambda";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import httpEventNormalizer from "@middy/http-event-normalizer";

const handler = async (event: APIGatewayEvent) => {
  const executablePath = process.env.IS_OFFLINE
    ? null
    : await chromium.executablePath;
  const browser = await chromium.puppeteer.launch({
    pipe: true,
    headless: true,
    devtools:false,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath
  });
  const page = await browser.newPage();
  const url=event.queryStringParameters.url;
  if (url === undefined) {
    return {
      statusCode: 400,
      headers: {
        "Content-type": "application/json"
      },
      body: '{"error":"Url is not found!"}'
    };
  }
  if (!url.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) {
    return {
      statusCode: 400,
      headers: {
        "Content-type": "application/json"
      },
      body: '{"error":"Invalid url!"}'
    };
  }
  var buf = decodeURIComponent(url);
  await page.setExtraHTTPHeaders({'Authorization':'Basic QmFua29wZW46QmFua29wZW5AMTYwMjIwMjEkIw=='});
  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");
  await page.goto(buf.toString(), {waitUntil: 'networkidle2'});
  await page.setViewport(
      {
        width: 1920,
        height: 1020,
        isLandscape: false,
        deviceScaleFactor: 60
      }
  );
  const data = await page.pdf({
    format: "A4",
    scale: 1,
    printBackground: true,
    margin: {
        top: "0",
        bottom: "0",
        right: "0",
        left: "0"
    },

  });
  await page.close();
  await browser.close();

  const stream = await data;

  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      'Content-type': 'application/pdf',//you can change any content type
      'content-disposition': 'attachment; filename=statement.pdf' // key of success
    },
    body: stream.toString("base64")
  };
};

export const generate = middy(handler).use(httpEventNormalizer()).use(doNotWaitForEmptyEventLoop());
