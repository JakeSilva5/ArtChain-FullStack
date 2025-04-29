import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useStorage } from "@thirdweb-dev/react";
import { mintNFT } from '@/helper/mintNFT';
import { ethers } from "ethers";
import { ARTCHAINNFT_CONTRACT_ADDRESS } from '@/contracts/constants/contractAddresses';
import ABI from '@/contracts/abi/ArtChainNFT.json';


export default function MintPage() {
  const router = useRouter();
  const { parentId } = router.query;

  const [form, setForm] = useState({
    name: '',
    description: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [useParentImage, setUseParentImage] = useState(false);
  const [parentImageUri, setParentImageUri] = useState(null);

  const storage = useStorage();

  useEffect(() => {
    const fetchParentMetadata = async () => {
      if (!parentId) return;

      try {
        const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
        const contract = new ethers.Contract(ARTCHAINNFT_CONTRACT_ADDRESS, ABI, provider);

        const tokenUri = await contract.tokenURI(parentId);
        const ipfsGatewayUrl = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
        const metadataResponse = await fetch(ipfsGatewayUrl);
        const metadata = await metadataResponse.json();

        setParentImageUri(metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
      } catch (error) {
        console.error("Failed to fetch parent metadata:", error);
      }
    };

    fetchParentMetadata();
  }, [parentId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || (!useParentImage && !form.image)) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      let finalImageUri;

      if (useParentImage) {
        finalImageUri = parentImageUri;
      } else {
        const imageFile = new File([form.image], form.image.name, { type: form.image.type });
        finalImageUri = await storage.upload(imageFile);
      }

      const metadata = {
        name: form.name,
        description: form.description,
        image: finalImageUri,
      };

      const metadataUri = await storage.upload(metadata);

      const tx = await mintNFT(metadataUri, parentId ? parseInt(parentId) : 0);
      console.log("✅ Minted NFT:", tx);

      alert("NFT minted successfully! 🎉");

      setForm({
        name: '',
        description: '',
        image: null,
      });

    } catch (error) {
      console.error("Upload or Minting failed:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <GlowContainer>
        <Header>
          <h1>Mint New NFT</h1>
          <p>Fill out the form below to mint your artwork on ArtChain.</p>
        </Header>

        <Form onSubmit={handleSubmit}>
          {parentId && (
            <CheckboxRow>
              <input
                type="checkbox"
                id="useParentImage"
                checked={useParentImage}
                onChange={(e) => setUseParentImage(e.target.checked)}
              />
              <label htmlFor="useParentImage">
                Use original NFT's image
              </label>
            </CheckboxRow>
          )}

          <Label>Artwork Name</Label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name of your NFT"
            disabled={loading}
          />

          <Label>Description</Label>
          <TextArea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter a short description"
            disabled={loading}
          />

          {!useParentImage && (
            <>
              <Label>Upload Visual</Label>
              <UploadContainer>
                <UploadInput
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={loading}
                />
              </UploadContainer>
            </>
          )}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Processing..." : "Mint NFT"}
          </SubmitButton>
        </Form>
      </GlowContainer>
    </PageWrapper>
  );
}

/* ---------------- STYLES ---------------- */

const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
`;

const GlowContainer = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 40px;
  border-radius: 20px;
  background: #0b0b0b;
  box-shadow: 0 0 18px rgba(138, 255, 128, 0.2), 0 0 24px rgba(138, 255, 128, 0.3);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 16px;
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Form = styled.form`
  width: 100%;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    margin-right: 10px;
  }

  label {
    font-size: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: #1a1a1a;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: #1a1a1a;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.text};
  height: 120px;
  resize: none;
  margin-bottom: 20px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const UploadContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  background: #111;
  padding: 30px;
  border-radius: ${({ theme }) => theme.radius};
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 30px;
`;

const UploadInput = styled.input`
  width: 100%;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #000;
    box-shadow: 0 0 14px ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;