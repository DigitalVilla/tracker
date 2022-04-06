import { isExpired, setExpiry } from "./expiry";

/**
 * Custom wrapper for the fetch function
 *
 * @param param - FetchProps
 * @returns Promise
 */
export async function fetchApi({
  api,
  body = {},
  options = { headers: {} },
  method = "POST",
  cacheType = "min",
  cacheInt = 0,
  cacheId = "",
}) {
  const session = window.localStorage.getItem("session");
  if (session) {
    options.headers.Authorization = `Bearer ${JSON.parse(session)?.token}`;
  }

  const ops = {
    method,
    redirect: "follow",
    ...options,
    headers: {
      "X-Amz-Security-Token": `${process.env.REACT_APP_ACCESS_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    if (method !== "GET" && method !== "HEAD") ops.body = JSON.stringify(body);

    if (cacheInt > 0) {
      const resp = JSON.parse(
        window.localStorage.getItem(cacheId || api) || "{}",
      );
      if (resp.exp && !isExpired(resp.exp)) return resp.data;
    }

    const response = await fetch(api, ops);

    let data = null;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.indexOf("application/json") >= 0) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (response.status >= 200 && response.status <= 299) {
      if (cacheInt > 0) {
        window.localStorage.setItem(
          cacheId || api,
          JSON.stringify({ data, exp: setExpiry(cacheType, cacheInt) }),
        );
      }
      return data;
    } else {
      return { error: data.message, code: response.status };
    }
  } catch (error) {
    return { error: error.message };
  }
}
