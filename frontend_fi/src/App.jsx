import "./index.scss";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import pages from "./pages";
import components from "./components";
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider,createConfig,http } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from 'wagmi/connectors';
// import { ConnectKitProvider, getDefaultClient } from "connectkit";


const
  queryClient = new QueryClient(),
  chains = [base,baseSepolia],

  client = createConfig(
    {
      chains: [baseSepolia],
      multiInjectedProviderDiscovery: true,
      connectors: [
        
        coinbaseWallet({
          appName: 'fi_cave',
          preference: 'smartWalletOnly', // set this to `all` to use EOAs as well
          version: '4',
        }),
        injected(),
      ],
      ssr: true,
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
      },
    }
  ),

  SignedOutAppLayout = () => {
    return (
      <>
        <components.Scroll />
        <components.NavbarSignedOut />
        <Outlet />
      </>
    );
  },

  SignedInAppLayout = () => {
    return (
      <>
        <components.Scroll />
        <components.NavbarSignedIn />
        <Outlet />
      </>
    );
  },

  ErrorPage = () => {
    return (
      <>
        <pages.NotFound />
      </>
    );
  },

  router = createBrowserRouter([
    {
      path: "/",
      element: <SignedOutAppLayout />,
      children: [
        {
          path: "/",
          element: < pages.Landing />
        }
      ]
    },
    {
      path: "/",
      element: <SignedInAppLayout />,
      children: [
        {
          path: "/files",
          element: <pages.Files />
        },
        {
          path: "/register",
          element: <pages.RegisterPatient />
        },
        {
          path: "/send",
          element: <pages.Send />
        },
        {
          path: "/upload",
          element: <pages.Upload />
        },
        {
          path: "/record",
          element: <pages.Record />
        },
        {
          path: "/archive",
          element: <pages.Archive />
        }
      ]
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);


function App() {
  return (
    <WagmiProvider config={client}>
      <QueryClientProvider client={queryClient}>
      <OnchainKitProvider chain={baseSepolia}>
      {/* <ConnectKitProvider > */}
        <section className="query">
          <div>
            <span>👋</span>
            <p>
              <b>Hi</b>, this app is currently not supported on mobile.
              <br />
              Please switch to a Tablet or larger. Thanks!
            </p>
          </div>
        </section>
        <section className="container">
          <RouterProvider router={router} />
        </section>
        </OnchainKitProvider>
      {/* </ConnectKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;;