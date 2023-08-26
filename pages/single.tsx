import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from "react";
import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives';
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { ChainId, ThirdwebProvider , useContract , ConnectWallet, useAddress, useSDK, ThirdwebSDK} from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
const activeChain = "mumbai"; 
import supabase from "../config/supabaseClient"
import Link from "next/link";
import { Center, Square, Circle } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'


import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

const IndexPage: NextPage = () => {

   const tomintcontract:any = useRouter()?.query?.c ?? "noget";
       const [name, setName] = useState("");
  const [myCar, setMyCar] = useState("nft-collection");
  const [symbol, setSymbol] = useState("");
  const [recipient, setRecipient] = useState("");
  const [percent, setPercent] = useState(0);
   const [countries, setCountries] = useState([] as any);
    /////////////////////////////////////start////////////
    // const router = useRouter();
    const { address } = useAccount();
  const sdk = new ThirdwebSDK("goerli", {
  clientId: "76afcbdf9c0c68d04e5173fc4dc18d80",
});

    // Function to deploy the proxy contract
 


    // platform_fee_recipient: recipient,
    //     platform_fee_basis_points: num,
const handleSubmit1 = async () => {
   const { data, error } = await supabase
      .from('deploy')
    .select('*')
    .eq('contract', tomintcontract)
setCountries(data);
// console.log('data',data);

}
handleSubmit1();
const handleSubmit = async (event: { preventDefault: () => void; }) => {
  
    if (!address || !sdk) {
        alert(`address: ${address}`);
      return;
    }


    //name , symbol type
    event.preventDefault();
    console.log(myCar);
    console.log(name);
    console.log(symbol);
    console.log(recipient);
    console.log(percent);
    let num = Number(percent);
    const type =  myCar; 
const discrption =  recipient; 
const msg =  'msg'; 
     const contractAddress = await sdk.deployer.deployBuiltInContract(
      myCar,
      {
        name: name,
        symbol: symbol,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: recipient,

        recipients: [
          {
            address:address,
            sharesBps: 100
          },
        ],
      }
    );

    // This is the contract address of the contract you just deployed
    console.log(contractAddress);
      alert(contractAddress);

      const contract =  contractAddress;
      if(contractAddress){
         const { data, error } = await supabase
      .from('deploy')
    .select('*')

    if (error) {
      console.log(error)
      console.log('error')

    }else{
      console.log('success');
    }

      }
    // alert(`Succesfully deployed ${contractSelected} at ${contractAddress}`);
    
    // alert(`The name you entered was: ${name}`);
  }


  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMyCar(event.target.value)
  }




  return (
    
         
    <Layout >


<Box css={{ maxWidth: 1000, mx: 'auto', mt: '100px' }}>

<Flex
      direction="column"
      align="center"

      css={{ mt: '100px', mb: "40px", textAlign: 'start' }}
      >   


<Heading fontSize='30px' >
Collection Details           </Heading>


</Flex>
       
        {address?  
countries.map((country: {
    discrption: ReactNode; id: Key | null | undefined; contract: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; type: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; 
}) => (
  

        <Flex direction="column" >

<HStack spacing='24px'>
  <Heading>Collection Name: </Heading>
    <Heading fontSize='20px'>  {country.name}</Heading> 
 
  </HStack>







  <HStack spacing='24px' mt='10px' mb='10px'>

                   <Link href={'mintupdate?c='+country.contract}>
                                
                   <Button
                    css={{minWidth: 150,
                          justifyContent: 'center', }}
                    size="medium">
                    Mint
                  
                    </Button>
                                
                   </Link>

              <Link href="setting">
              <Button
                    css={{minWidth: 150,
                          justifyContent: 'center', }}
                    size="medium"  >
                    Settings
                  
                    </Button>

              </Link>
                <hr></hr>

                </HStack>



           <TableContainer>
  <Table  width= "1000px">
  <thead>
    <tr>
      <th>TOKEN ID</th>
      <th>MEDIA</th>
      <th>NAME</th>
      <th>DESCRIPTION</th>
      <th>OWNER</th>
    </tr>
  </thead>
  <tbody>
    
    <tr >
      <td colSpan={10}>Not Found</td>

    </tr>
  </tbody>
  </Table>
</TableContainer>


        </Flex>
        
        )
        )
      :
 <>

    </> 
}
      {/* </tbody>
      </table>
 */}



</Box>
    </Layout>

  )
}

export default IndexPage
