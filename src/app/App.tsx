import { AppRouter } from "./routes";
import 'shared/assets/style.scss';
import { MainProviders } from "app/providers";
import './config/firebase.config'

const App = () => {
  return (
    <MainProviders>
      <AppRouter/>
    </MainProviders>
  )
}

export default App
