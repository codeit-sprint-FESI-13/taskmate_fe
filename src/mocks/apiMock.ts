import { http } from "msw";

const getMockPath = (path: string) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `*${cleanPath}`;
};

export const apiMock = {
  get: (path: string, resolver: Parameters<typeof http.get>[1]) =>
    http.get(getMockPath(path), resolver),

  post: (path: string, resolver: Parameters<typeof http.post>[1]) =>
    http.post(getMockPath(path), resolver),

  put: (path: string, resolver: Parameters<typeof http.put>[1]) =>
    http.put(getMockPath(path), resolver),

  patch: (path: string, resolver: Parameters<typeof http.patch>[1]) =>
    http.patch(getMockPath(path), resolver),

  delete: (path: string, resolver: Parameters<typeof http.delete>[1]) =>
    http.delete(getMockPath(path), resolver),
};
