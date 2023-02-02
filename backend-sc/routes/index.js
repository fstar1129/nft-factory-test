import express from "express";
import NFTFactoryABI from '../abis/NFTFactory.json' assert { type: "json" };
import { ethers } from "ethers";
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
const contract = new ethers.Contract(process.env.NFT_Factory_Address, NFTFactoryABI, provider);
let start = parseInt(process.env.NFT_FACTORY_CONTRACT_DEPLPYMENT_BLOCKNUMBER);

contract.on("CollectionCreated", (collection, name, symbol, event) => {
    const parsedEventData = {
        transactionHash: event.transactionHash,
        collection: event.args.collection,
        name: event.args.name,
        symbol: event.args.symbol,
    }
    Collections = Collections.concat(parsedEventData);
})
contract.on("TokenMinted", (collection, recipient, tokenId, tokenUri, event) => {
    const parsedEventData = {
        transactionHash: event.transactionHash,
        collection: event.args.collection,
        recipient: event.args.recipient,
        tokenId: event.args.tokenId.toString(),
        tokenUri: event.args.tokenUri,
    }
    mints = mints.concat(parsedEventData);
})

let Collections = [];
let mints = [];
async function CollectionCreated() {
    try {
        const till = parseInt((await provider.getBlockNumber()).toString());

        const filter = await contract.filters.CollectionCreated();
        while (start <= till) {
            const events = await contract.queryFilter(filter, start, start + 2500);
            const parsedEventData = events.map(event => {
                return {
                    transactionHash: event.transactionHash,
                    collection: event.args.collection,
                    name: event.args.name,
                    symbol: event.args.symbol,
                }
            })
            Collections = Collections.concat(parsedEventData);
            start = start + 2500;
        }
    } catch (error) {
        console.log(error);
    }
}
CollectionCreated();

async function TokenMinted() {
    try {
        const till = parseInt((await provider.getBlockNumber()).toString());

        const filter = await contract.filters.TokenMinted();
        while (start <= till) {
            const events = await contract.queryFilter(filter, start, start + 2500);
            const parsedEventData = events.map(event => {
                return {
                    transactionHash: event.transactionHash,
                    collection: event.args.collection,
                    recipient: event.args.recipient,
                    tokenId: event.args.tokenId.toString(),
                    tokenUri: event.args.tokenUri,
                }
            })
            mints = mints.concat(parsedEventData);
            start = start + 2500;
        }
    } catch (error) {
        console.log(error);
    }
}
TokenMinted();


router.get('/collections', (req, res) => {
    res.send(JSON.stringify(Collections))
});
router.get('/mints', (req, res) => {
    res.send(JSON.stringify(mints))
});
export default router;