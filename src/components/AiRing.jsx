import { Box, keyframes } from '@chakra-ui/react';
import ringImage from '../assets/AiRing.png';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function AiRing({ size = "40px" }) {
  return (
    <Box
      width={size}
      height={size}
      animation={`${spin} 3s linear infinite`}
      backgroundImage={`url(${ringImage})`}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      // 👇 Trim any excess default space
      padding="0"
      margin="0"
      display="inline-block"
    />
  );
}
