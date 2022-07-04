import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { streamToString } from 'next/dist/server/node-web-streams-helper';
import { getMarkupFromTree } from '@apollo/client/react/ssr';

function MyDocument() {
  return (
    <Html lang="en">
      <Head/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // @ts-ignore
  const { req: { pageProps }, renderPage } = ctx;

  ctx.renderPage = () => renderPage({
    enhanceRenderShell: async (Tree, { renderToReadableStream }) => {
      let stream: ReadableStream;

      const html = await getMarkupFromTree({
        tree: Tree,
        renderFunction: async (Tree) => {
          stream = await renderToReadableStream(Tree);

          return streamToString(stream.tee()[1]);
        },
      });

      return {
        stream: stream!,
        html,
        pageProps: {
          apolloClient: undefined,
          apolloState: pageProps.apolloClient.extract(),
        },
      };
    },
  });

  return Document.getInitialProps(ctx);
};

export default MyDocument;
