import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faHouse, faFolder, faCloudArrowUp, faPaperPlane, faShareNodes, faBell, faGear, faMagnifyingGlass, faPassport, faClipboardUser, faBoxesPacking } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

// import { ConnectKitButton } from "connectkit";
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
    useName,
    getName
  } from '@coinbase/onchainkit/identity';
import style from "./navbar.module.scss";
import "./style.css";
import { useAccount } from "wagmi";

const NavbarSignedIn = () => {
    const [user, setUser] = useState("User");
    const {address}= useAccount();
    // const name=useName();
    // setUser(address);
    return (
        <section className={style.navbar}>
            <div className={style.nav_left}>
                <nav>
                <h2>FiCave</h2>
            
            <Wallet>
  <ConnectWallet>
    <Avatar sizes="1" />
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
                    <ul>
                        <li>
                            <NavLink to={"/"}>
                                <FontAwesomeIcon icon={faHouse} />
                                home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/files"}>
                                <FontAwesomeIcon icon={faFolder} />
                                my files
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/register"}>
                                <FontAwesomeIcon icon={faPassport} />
                                register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/upload"}>
                                <FontAwesomeIcon icon={faCloudArrowUp} />
                                upload
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/send"}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                                send files
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/record"}>
                                <FontAwesomeIcon icon={faClipboardUser} />
                                records
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/archive"}>
                                <FontAwesomeIcon icon={faBoxesPacking} />
                                archive
                            </NavLink>
                        </li>
                        
             {/* <ConnectKitButton.Custom>
                                {({ isConnected, show, truncatedAddress }) => {
                                    return (
                                        <button onClick={show}>
                                            {isConnected ? user : "Connect"}
                                            {
                                                (isConnected
                                                    ? truncatedAddress
                                                    : "Connect" && setUser("User"))
                                                && (setUser(truncatedAddress))
                                            }
                                        </button>
                                    );
                                }}
                            </ConnectKitButton.Custom> */}
                    </ul>
                </nav>
            </div>
            <div className={style.nav_right}>
                <h3>Welcome, {address? <Name address={address} className="bg-opacity-0 bg-transparent"/>: "user"} ! 👋</h3>
                <div>
                    <span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="text" placeholder="Search in Cave" />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faBell} />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faGear} />
                    </span>
                    <span>
                        <img src={require("../../assets/images/19.png")} />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default NavbarSignedIn;