import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from "react";
import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives';
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faWallet } from '@fortawesome/free-solid-svg-icons'
import { ChainId, ThirdwebProvider , useContract , ConnectWallet, useAddress, useSDK} from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
const activeChain = "mumbai"; 
import supabase from "../config/supabaseClient"
import { Heading } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'

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
  Link,
} from '@chakra-ui/react'
import { ConnectWalletButton } from "components/ConnectWalletButton";
const IndexPage: NextPage = () => {


       const [name, setName] = useState("");
  const [myCar, setMyCar] = useState("nft-collection");
  const [symbol, setSymbol] = useState("");
  const [recipient, setRecipient] = useState("");
  const [percent, setPercent] = useState(0);
   const [countries, setCountries] = useState([] as any);
    /////////////////////////////////////start////////////
    // const router = useRouter();
   const { address, isConnected } = useAccount()
  const sdk = useSDK();

    // Function to deploy the proxy contract
 


    // platform_fee_recipient: recipient,
    //     platform_fee_basis_points: num,
const handleSubmit1 = async () => {
   const { data, error } = await supabase
      .from('deploy')
    .select('*')
    .eq('address', address)
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
    
         
    <Layout>

<Box css={{ maxWidth: 1000, mx: 'auto' }}>
{isConnected ? ( <>
<Flex
      direction="column"
      align="center"

      css={{ mt: '100px', mb: "4px", textAlign: 'start' }}
      >   


<Heading  fontSize='22px'>
Contracts / Collection              </Heading>


</Flex>

<Flex
      direction="column"
      align="start"

      css={{ mt: '100px', mb: "4px", textAlign: 'start' }}
      >   

<Link href="deploy" style={{ marginBottom:'5px'}}>

<Button
                css={{
                  minWidth: 100,
                  justifyContent: 'center',
                }}
                size="small"
              >
              Deploy Contract
              </Button>

  </Link>

</Flex>

<TableContainer>
<Table  width= "1000px">
                <thead>
                <tr>
                <th>Contract ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Chain</th>
                <th>Action</th>
                </tr>
            </thead>
        <tbody style={{ textAlign:'center'}}>

       
        {address?  
countries.map((country: { id: Key | null | undefined; contract: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; type: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; }) => (
    <tr key={country.id}>
        {/* <td><a href={'single?c='+country.contract}>{country.contract}</a></td> */}
        <td><b><Link className="linkmain link" style={{ color:'#6e56cf'}}  target="_blank" href={'collection/goerli/'+country.contract}>
        {
          // @ts-ignore: Object is possibly 'null'.
        country.contract.slice(0, 6) + "..." + country.contract.slice(-4)
        }
        
        </Link></b></td>
        <td>{country.name}</td>
        <td>{country.type == 'nft-collection' &&
        <>
        erc721
        </>
        }
        {country.type == 'edition' &&
        <>
        erc1155
        </>
        }
        
        </td>
        <td className="chainmain"> 
         <Link className="linkmain link" target="_blank"  href={'https://goerli.etherscan.io/address/'+country.contract}>
        <img src="https://15065ae3c21e0bff07eaf80b713a6ef0.ipfscdn.io/ipfs/bafybeigzgztdmt3qdt52wuhyrrvpqp5qt4t2uja23wmfhsccqt332ek7da/ethereum/512.png" width={20} /> Goerli
        </Link>
        </td>
        <td>
          <Link className="linkmain link link hover" style={{ color:'#6e56cf!important'}} href={'mintupdate?c='+country.contract+'&t='+country.type}>
            Mint
            </Link> &nbsp;&nbsp;

              <Link className="linkmain link hover"  href={'setting?c='+country.contract+'&t='+country.type}
  
              >
             
                    Settings
                  
                  

              </Link></td>
    </tr>

        ))
      :

<tr key={1}>
        <td colSpan={10}>No Result Found</td>

    </tr>
     
}




{countries.length ? 
(<div>  </div>)
:(<tr key={1}>
        <td colSpan={10}>No contracts available to display</td>

    </tr>)}


      </tbody>
    </Table>
</TableContainer>

</>
) : (
            <Flex
              direction="column"
              align="center"
              css={{ mx: 'auto', py: '120px', maxWidth: '350px', gap: '$4' }}
            >
              <Text style="h4" css={{ mb: '$3' }}>
                Create Contracts & Mint
              </Text>
              <Text css={{ color: '$gray11' }}>
                <FontAwesomeIcon icon={faWallet} size="2xl" />
              </Text>
              <Text
                style="body1"
                css={{ color: '$gray11', textAlign: 'center', mb: '$4' }}
              >
                Connect wallet create contracts & mint.
              </Text>
              <ConnectWalletButton />
            </Flex>
          )}
</Box>


    </Layout>

  )
}

export default IndexPage
