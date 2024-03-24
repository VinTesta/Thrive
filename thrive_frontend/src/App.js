import React, { useState } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import Head from './components/Heads';
import Footer from './components/Footers';
import thriveArt from '../src/assets/thriveArt2.png';
import SidePanel from './components/SidePanel';





function App() {

  // return (
  //   <div className="flex flex-col min-h-screen w-full h-full items-center justify-center bg-gradient-to-b from-blue-900 to-blue-100" >
  //     <div className="flex flex-col container mx-auto mt-8 items-center justify-center">
  //       <h1 className="text-2xl font-bold mb-4 font-serif">Conexão que muda o mundo</h1>
  //       {/* <Tile tiles={tiles} /> */}
  //     </div>

  //     <div className="flex flex-col bg-blue-900 w-1/3 items-left rounded-md" >
  //       {/* <p>
  //         Receba sua Proof-Of-Attendance NFT
  //       </p> */}

  //       <p className="text-white p-2 text-xl mt-4 ">
  //         Receba sua Proof-Of-Attendance NFT
  //       </p>
  //       <p className="text-white p-2 text-xs">
  //         Para receber sua NFT você precisa ter participado do evento e ter carteira na rede Sepolia.
  //         <br></br>
  //         <br></br>
  //         Ainda não tem uma carteira? Acesse o link e crie já a sua: Clique aqui
  //       </p>
  //       <form className="flex flex-col mt-8 p-2 ">
  //         <Input description="Esse nome será gravado no NFT para provar sua presença" label="Seu nome" placeholder="Nome"/>
  //         <Input description="E-mail para receber news" label="Email" placeholder="user@email.com"/>
  //         <Input description="Wallet" label="Carteira para receber o NFT da Sepolia" placeholder="0x00...0000"/>
  //       </form>
  //       <Button type="Submit" name="Gerar NFT" />
  //     </div>

  //   </div>
  // );

  
  return (
  
  <div className="h-full mt-10 flex flex-col  bg-gradient-to-b from-[#070a52] to-[#a6b6c6]">
    <Head />
    <div className="mt-10 flex flex-col max-w-4xl p-8 mx-auto rounded-lg mb-10 items-center w-1/2 ">
      <p className="mt-10 text-1xl text-[#a6b6c6] font-bold mb-2">SOBRE A THRIVE</p>
      <h1 className="mt-10 text-8xl font-bold text-[#a6b6c6] mb-10 text-center w-2/3">Conexão que muda o mundo</h1>
      <div className="overflow-y-auto max-h-96"></div>
    </div>
    <div className="max-w-4xl p-8 mx-auto rounded-lg ">
      <div className="overflow-y-auto max-h-96">

      </div>
    </div>

    <div className="h-full w-full mt-10 flex flex-col items-center justify-center">
      <div className="mt-10 flex flex-col max-w-4xl p-8 mx-auto rounded-lg mb-20 items-center justify-center">
        <p className="mt-10 text-4xl text-[#070a52] font-bold mb-10">SOBRE A THRIVE</p>
        <h1 className="text-2xl mb-4 text-[#070a52] text-center w-2/3">Somos uma plataforma revolucionária que possibilita aos estudantes solicitarem bolsas de estudo e o conecta com investidores.</h1>      
        <p className="mt-10 text-3xl text-[#070a52] italic mb-10">"Aqui seu investimento pode mudar vidas"</p>
        <Button type="Submit" name="Seja Bolsista >" />
            {/* <SidePanel panelContent={<div>Content for side panel goes here</div>}>
              Open Side Panel
            </SidePanel> */}
        <Button type="Submit" name="Invista >" />
        <div className="overflow-y-auto max-h-96"></div>
      </div>

    </div>
    <Footer />
  </div>
  );
};


export default App;


//   return (
//     <>
//       <button
//         className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         onClick={openSidePanel}
//       >
//         Open Side Panel
//       </button>
//       {isOpen && (
//         <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50">
//           <div className="flex justify-end">
//             <button
//               className="text-gray-600 hover:text-gray-800 p-2"
//               onClick={closeSidePanel}
//             >
//               Close
//             </button>
//           </div>
//           {/* Content of the side panel goes here */}
//           <div className="p-4">
//             <h1>Side Panel Content</h1>
//             <p>This is the content of the side panel.</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
