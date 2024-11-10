
import { useNavigate, useParams } from 'react-router-dom'
import '../PromotionManagement/ViewPromotionDetail.css'
import { Layout, Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { convertDateToDateString } from '../../../utils/utils';
import { useGetPromotionByIdQuery } from '../../../services/promotionAPI';
// import { Button } from 'bootstrap';



export default function ViewPromotionDetail() {
    // const [loading, setLoading] = useState(true);
    const { Sider, Content } = Layout;
    const siderStyle = {
        textAlign: 'center',
        minHeight: 200,
        lineHeight: '100px',
        color: '#fff',
        backgroundColor: '#fff',

    };
    const contentStyle = {
        textAlign: 'start',
        minHeight: 100,
        lineHeight: '70px',
        color: 'black',
        backgroundColor: '#fff',
    };

    let { promotionCode } = useParams();
    const {
        data: promotionData,
        error: promotionError
    } = useGetPromotionByIdQuery(promotionCode);

    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/promotion');
    };

    return (
        <>
            {!promotionError ? <div className='container'>
                {/* ViewProductDetail: {promotionId} */}
                <p className='header-detail'>Promotion Detail</p>
                <Layout>
                    <Sider width="55%" style={siderStyle}>
                        <div className='container-img'>
                            <img src='https://i.pinimg.com/236x/bd/68/12/bd681235305ff7faeba65ee6976e89d4.jpg'
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    marginTop: '40px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                }} />
                        </div>
                    </Sider>
                    <Content style={contentStyle}>
                        <div style={{ margin: '22px 0px 0px 0px', fontSize: '20px' }}>
                            <p>
                                Promotion Code:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{promotionData?.promotionCode}</span>
                            </p>
                            <p>
                                Start Date:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{convertDateToDateString(promotionData?.startDate)}</span>
                            </p>
                            <p>
                                End Date:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{convertDateToDateString(promotionData?.endDate)}</span>
                            </p>
                        </div>
                    </Content>
                </Layout>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <Button
                        type="primary"
                        onClick={handleBack}
                        icon={<RollbackOutlined />}
                    >
                        Back to Promotion page
                    </Button>
                </div>

            </div> :
                <div>
                    {promotionError?.data}
                </div>}

        </>

    )
}