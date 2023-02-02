import React, { useState } from "react";
import TableData from "./TableData";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { ABI } from "../abis/NFTFactory";
import TableMintData from "./TableMintData";

function Main() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [collcetionAddress, setCollcetionAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenUri, setTokenUri] = useState("");

  const signer = useSigner();
  let factory = new ethers.Contract(
    "0x66d107D38ca33B44cA966afcAb2B22518c66B879",
    ABI,
    signer.data
  );

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!name || !symbol) return;
    // Connection with Smart contract
    await factory.createNewCollection(name, symbol);
    setName("");
    setSymbol("");
  };

  const handleMint = async (e) => {
    e.preventDefault();
    if (!collcetionAddress || !tokenId || !tokenUri) return;
    await factory.mint(
      collcetionAddress,
      tokenId,
      signer.data._address,
      tokenUri
    );

    setCollcetionAddress("");
    setTokenId("");
    setTokenUri("");
  };

  return (
    <div className="main flex text-3xl text-white mt-8">
      {/* Creating Token */}
      <div className="w-1/2">
        <div className="flex justify-center">
          <div className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[30px] rounded-2xl flex flex-col justify-center items-center h-fit">
            <div className="mt-10">Create Token Here</div>
            <form onSubmit={handlesubmit}>
              <div className="flex flex-col items-center justify-center p-10">
                <div className="flex items-center gap-5 my-5">
                  <span className="text-2xl">Name &nbsp;&nbsp;: </span>
                  <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent text-xl outline-none rounded-full border py-2 px-4"
                  />
                </div>
                <div className="flex items-center gap-5">
                  <span className="text-2xl">Symbol : </span>
                  <input
                    type="text"
                    placeholder="symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="bg-transparent text-xl outline-none rounded-full border py-2 px-4"
                  />
                </div>
                <div className="mt-10 w-[50%] border rounded-full p-2 text-center flex items-center justify-center  hover:bg-[rgba(118,87,127,0.5)] duration-200 ease-linear hover:cursor-pointer">
                  <button type="submit" className="text-base">
                    Create Token
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[100%] mt-5 justify-center flex">
          <div>
            <TableData />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className=" border border-white"></div>

      {/* Ceating Mint */}
      <div className="w-1/2">
        <div className="flex justify-center ">
          <div className="bg-[rgba(255,255,255,0.2)] backdrop-blur-[30px] rounded-2xl flex flex-col justify-center items-center h-fit">
            <div className="mt-10">Mint Token Here</div>
            <form onSubmit={handleMint}>
              <div className="flex flex-col items-center justify-center p-10">
                <div className="flex items-center gap-5 my-5">
                  <span className="text-2xl">Collecion Address : </span>
                  <input
                    type="text"
                    placeholder="Collecion Address"
                    value={collcetionAddress}
                    onChange={(e) => setCollcetionAddress(e.target.value)}
                    className="bg-transparent text-xl outline-none rounded-full border py-2 px-4"
                  />
                </div>
                <div className="flex items-center gap-5 ">
                  <span className="text-2xl w-[180px]">Token Id</span>:
                  <input
                    type="text"
                    placeholder="Token Id"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    className="bg-transparent text-xl outline-none rounded-full border py-2 px-4"
                  />
                </div>
                <div className="flex items-center gap-5 my-5">
                  <span className="text-2xl w-[180px]">Token Uri</span>:
                  <input
                    type="text"
                    placeholder="Token Uri"
                    value={tokenUri}
                    onChange={(e) => setTokenUri(e.target.value)}
                    className="bg-transparent text-xl outline-none rounded-full border py-2 px-4"
                  />
                </div>
                <div className="mt-5 w-[50%] border rounded-full p-2 text-center flex items-center justify-center  hover:bg-[rgba(17,52,79,0.5)] duration-200 ease-linear hover:cursor-pointer">
                  <button type="submit" className="text-base">
                    Mint
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[100%] mt-5 justify-center flex">
          <div>
            <TableMintData />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
