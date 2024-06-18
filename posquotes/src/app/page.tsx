"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { RoomProvider } from "@liveblocks/react/suspense";
import { Loading } from "../components/Loading";
import { ClientSideSuspense } from "@liveblocks/react";
import { ErrorBoundary } from "react-error-boundary";
import { CommentsCanvas } from "../components/CommentsCanvas";
import '../styles/globals.css'

export default function Page() {
  const roomId = useExampleRoomId("liveblocks:examples:nextjs-comments-canvas");

  return (
    <div className="container mx-auto px-64 max-w-xl">

      <header className="py-4">
        <h1 className="text-3xl font-mono text-white font-bold text-left">PosQuotes: A New Community to Share Quotes</h1>
      </header>

      <RoomProvider id={roomId}>
        <ErrorBoundary
          fallback={
            <div className="error">There was an error while getting threads.</div>
          }
        >
          <ClientSideSuspense fallback={<Loading />}>
            <CommentsCanvas />
          </ClientSideSuspense>
        </ErrorBoundary>
      </RoomProvider>
    </div>
  );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useExampleRoomId(roomId: string) {
  const params = useSearchParams();
  const exampleId = params?.get("exampleId");

  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId;
  }, [roomId, exampleId]);

  return exampleRoomId;
}
