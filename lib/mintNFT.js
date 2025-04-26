import { ethers } from "ethers";
import ABI from "@/contracts/abi/ArtChainNFT.json";
import { CONTRACT_ADDRESS } from "@/contracts/constants/contractAddresses";

/**
Function to mint an NFT on the blockchain

@param {string} metadataURI - The IPFS URI of the metadata.json
 */
export async function mintNFT(metadataURI) {
  if (!window.ethereum) {
    throw new Error("No crypto wallet found. Please install Metamask.");
  }

  try {
    //connecting to user's wallet
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    //creating contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    //calling mintNFT function on contract
    const tx = await contract.mintNFT(metadataURI, 0); // parentTokenId = 0 = no parent
    console.log("Transaction sent:", tx.hash);

    await tx.wait(); //waiting for confirmation
    console.log("Transaction confirmed:", tx.hash);

    return tx;
  } catch (error) {
    console.error("Failed to mint NFT:", error);
    throw error;
  }
}
