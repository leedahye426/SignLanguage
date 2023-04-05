import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './screens/Home';
import Learn from './screens/Learn';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Test from './screens/Test';
import Announce from './screens/Announce';
import Header from './screens/Header';
import Container from '@mui/material/Container';
import Today from './screens/Today';

const sections = [
  { title: '카테고리별 학습하기', url: '/Learn' },
  { title: '오늘의 수어', url: '/Today' },
  { title: '테스트하기', url: '/Test' },
  { title: '공지사항', url: '/Announce' },
];


function App() {
  return (
    <Router>
      <Container maxWidth="lg">
      <Header title="수어지교" sections={sections}/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/Learn" element = {<Learn/>} />
        <Route path="/Today" element = {<Today/>} />
        <Route path="/SignIn" element = {<SignIn/>} />
        <Route path="/SignUp" element = {<SignUp/>} />
        <Route path="/Test" element = {<Test/>} />
        <Route path="/Announce" element = {<Announce/>} />
      </Routes>
      </Container>
    </Router>
  );
}

export default App;
