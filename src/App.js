import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './screens/Home';
import Learn from './screens/Learn';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Test from './screens/Test';
import Header from './screens/Header';
import Container from '@mui/material/Container';
import Translate from "./screens/Translate";
import Mypage from './screens/Mypage';

const sections = [
  { title: '수어 번역기', url: '/Translate' },
  { title: '카테고리별 학습하기', url: '/Learn' },
  { title: '테스트하기', url: '/Test' },
];


function App() {
  return (
    <Router>
      <Container maxWidth="lg">
      <Header title="수어지교" sections={sections}/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/Learn" element = {<Learn/>} />
        <Route path="/Learn/:1" element={<Learn/>} />
        <Route path="/Translate" element={<Translate/>} />
        <Route path="/SignIn" element = {<SignIn/>} />
        <Route path="/SignUp" element = {<SignUp/>} />
        <Route path="/Test" element = {<Test/>} />
        <Route path="/Mypage" element = {<Mypage/>} />
      </Routes>
      </Container>
    </Router>
  );
}

export default App;
