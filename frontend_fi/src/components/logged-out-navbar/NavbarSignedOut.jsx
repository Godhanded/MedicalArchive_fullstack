import style from "./navbar.module.scss";
import { Link } from "react-router-dom";
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownBasename, 
    WalletDropdownFundLink, 
    WalletDropdownLink, 
    WalletDropdownDisconnect,
  } from '@coinbase/onchainkit/wallet';
  import {
    Address,
    Avatar,
    Name,
    Identity,
    EthBalance, 
  } from '@coinbase/onchainkit/identity';
  import { color } from '@coinbase/onchainkit/theme';
import { useAccount } from "wagmi";

// import { ConnectKitButton } from "connectkit";

const NavbarSignedOut = () => {
    const account= useAccount();

    return (
        <section className={style.navbar}>
            <h1>FiCave</h1>

            <nav>
                <ul>
                    <li>
                        <Link>explore</Link>
                    </li>
                    <li>
                        <Link>documentation</Link>
                    </li>
                    <li>
                        <Link>media kit</Link>
                    </li>
                    <li>
                        <Link>files</Link>
                    </li>
    <li className="my-10 flex justify-center">
            <Wallet>
  <ConnectWallet>
    <Avatar sizes="1"/>
    <Name />
  </ConnectWallet>
  <WalletDropdown>
    <Identity 
      className="px-4 pt-3 pb-2" 
      hasCopyAddressOnClick
      >
      <Avatar />
      <Name />
      <Address />
      <EthBalance />
    </Identity>
    <WalletDropdownBasename />
    <WalletDropdownLink
      icon="wallet"
      href="https://keys.coinbase.com"
      >
      Wallet
    </WalletDropdownLink>
    <WalletDropdownFundLink />
    <WalletDropdownDisconnect />
  </WalletDropdown>
</Wallet>

</li>
      </ul>
            </nav>
            

            {/* <Link><ConnectKitButton.Custom>
                {({ isConnected, show, truncatedAddress }) => {
                    return (
                        <button onClick={show}>
                            {isConnected ? truncatedAddress : "Connect"}
                        </button>
                    );
                }}
            </ConnectKitButton.Custom></Link> */}
        </section>
    );
};

export default NavbarSignedOut;