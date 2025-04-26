import { useState } from 'react';
import styled from 'styled-components';
import { useStorage } from "@thirdweb-dev/react";
import { mintNFT } from '@/helper/mintNFT';

export default function MintPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const storage = useStorage();

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

    if (!form.name || !form.description || !form.image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    try {
      setLoading(true);

      const imageFile = new File([form.image], form.image.name, { type: form.image.type });
      const imageUri = await storage.upload(imageFile);
      console.log("✅ Image pinned:", imageUri);

      const metadata = {
        name: form.name,
        description: form.description,
        image: imageUri,
      };

      const metadataUri = await storage.upload(metadata);
      console.log("✅ Metadata pinned:", metadataUri);

      const tx = await mintNFT(metadataUri);
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

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Processing..." : "Mint NFT"}
          </SubmitButton>
        </Form>
      </GlowContainer>
    </PageWrapper>
  );
}

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