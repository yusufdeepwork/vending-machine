import VendingMachine from './containers/VendingMachine'

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full h-auto sm:h-screen flex justify-center items-center bg-slate-100 p-4 sm:p-0">
      <VendingMachine />
    </div>
  )
}

export default App
