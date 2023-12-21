import { useParams } from 'react-router-dom';
import '../components/mypage/MyPage.css'
import MyPageNav from "components/mypage/MyPageNav";
import MyWatchedList from 'components/mypage/MyWatchedList';

const MyPage = ({}) => {
    const {page} = useParams()

    return (<div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', width: '80%', gap: 20, padding: '10px'}}>
            <MyPageNav currentPage={page}/>
            <MyWatchedList/>
        </div>
    </div>)
}

export default MyPage;