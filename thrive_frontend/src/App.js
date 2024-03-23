import React from 'react';
import Input from './components/Input';
import Button from './components/Button';


function App() {
  return (
    <div className="flex min-h-screen w-full h-full items-center justify-center">
      
      <div className="flex flex-col bg-blue-900 w-1/3 items-left rounded-md">
        {/* <p>
          Receba sua Proof-Of-Attendance NFT
        </p> */}

        <p className="text-white p-2 text-xl mt-4 ">
          Receba sua Proof-Of-Attendance NFT
        </p>
        <p className="text-white p-2 text-xs">
          Para receber sua NFT você precisa ter participado do evento e ter carteira na rede Sepolia.
          <br></br>
          <br></br>
          Ainda não tem uma carteira? Acesse o link e crie já a sua: Clique aqui
        </p>
        <form className="flex flex-col mt-8 p-2 ">
          <Input description="Esse nome será gravado no NFT para provar sua presença" label="Seu nome" placeholder="Nome"/>
          <Input description="E-mail para receber news" label="Email" placeholder="user@email.com"/>
          <Input description="Wallet" label="Carteira para receber o NFT da Sepolia" placeholder="0x00...0000"/>
        </form>
        <Button type="Submit" name="Gerar NFT" />
      </div>

    </div>
  );
}

export default App;
