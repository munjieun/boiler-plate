import React, {useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    useEffect(() => {
      axios.get('/api/hello')
      .then(response => console.log(response.data))
    }, [])
    
    const navigation = useNavigate();
    const onClickHandler = () => {
      axios.get('/api/users/logout')
      .then(response => {
        //console.log(response.data);
        if (response.data.success) {
          navigation('/login');
        } else {
          alert('로그아웃 하는 데 실패 했습니다.');
        }
      })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
          <h2>시작 페이지</h2>
          <button onClick={onClickHandler}>
            LOGOUT
          </button>
        </div>
    )
}

export default LandingPage