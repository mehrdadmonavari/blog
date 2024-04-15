import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
   publicFiles: es
      .fileBucket({
         maxSize: 1024 * 1024 * 1, //1MB
         accept: ["image/jpeg", "image/jpg", "image/png"],
      })
      .beforeDelete(({ ctx, fileInfo }) => {
         console.log("beforeDelete", ctx, fileInfo);
         return true; // allow delete
      }),
});

const handler = createEdgeStoreNextHandler({
   router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
