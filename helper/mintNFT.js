import { ethers } from "ethers";
import ABI from "@/contracts/abi/ArtChainNFT.json";
import { ARTCHAINNFT_CONTRACT_ADDRESS } from "@/contracts/constants/contractAddresses";

/**
Function to mint an NFT on the blockchain

@param {string} metadataURI - The IPFS URI of the metadata.json
@param {number} parentId - The parent NFT tokenId (default 0 = no parent)
 */
export async function mintNFT(metadataURI, parentId = 0) {
  if (!window.ethereum) {
    throw new Error("No crypto wallet found. Please install Metamask.");
  }

  try {
    //connecting to user's wallet
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    //creating contract instance
    const contract = new ethers.Contract(
      ARTCHAINNFT_CONTRACT_ADDRESS,
      ABI,
      signer
    );
    
    //calling mintNFT function on contract
    const tx = await contract.mintNFT(metadataURI, parentId);
    console.log("Transaction sent:", tx.hash);

    //waiting for confirmation
    await tx.wait();
    console.log("Transaction confirmed:", tx.hash);

    return tx;
  } catch (error) {
    console.error("Failed to mint NFT:", error);
    throw error;
  }
}
