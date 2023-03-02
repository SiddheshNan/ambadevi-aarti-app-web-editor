function sendResponse(
  data,
  status = 200,
  headers = {
    "Content-Type": "application/json",
  }
) {
  return new Response(typeof data === "object" ? JSON.stringify(data) : data, {
    status,
    headers: {
      ...headers,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function onRequestOptions(request) {
  return sendResponse(null, 200, {
    "Content-Type": "text/plain",
  });
}

const MyPassWord = "thisisadmin123";

export async function onRequestGet(request) {
  const { searchParams } = new URL(request.url);
  let password = searchParams.get("password");

  if (MyPassWord !== password)
    return sendResponse({ error: "Invalid pass" }, 500);

  const otherPdf = request.env.ambadeviAartiAppWeb.prepare(
    "SELECT * from otherPdf"
  );
  const aartiSangrah = request.env.ambadeviAartiAppWeb.prepare(
    "SELECT * from aartiSangrah"
  );
  const ashtakPustika1 = request.env.ambadeviAartiAppWeb.prepare(
    "SELECT * from ashtakPustika1"
  );
  const ashtakPustika2 = request.env.ambadeviAartiAppWeb.prepare(
    "SELECT * from ashtakPustika2"
  );
  const kakadAarti = request.env.ambadeviAartiAppWeb.prepare(
    "SELECT * from kakadAarti"
  );

  const dbout = await Promise.all([
    otherPdf.all(),
    aartiSangrah.all(),
    ashtakPustika1.all(),
    ashtakPustika2.all(),
    kakadAarti.all(),
  ]);

 

  return sendResponse({
    dbout
  });
}
