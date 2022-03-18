// App.tsx
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import Layout from './components/Layout';
import ConnectButton from './components/ConnectButton';
import AccountModal from './components/AccountModal';
// import '@fontsource/inter';

export default function App() {
  // Pull the disclosure methods
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    // lets us use Chakra UI syntax across our app:
    <ChakraProvider>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Layout>
    </ChakraProvider>
  );
}
