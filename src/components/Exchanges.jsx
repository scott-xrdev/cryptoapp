import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import millify from 'millify';

import { useGetExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    console.log(exchangesList);

    if(isFetching) return <Loader />;
    
    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Collapse accordion defaultActiveKey={exchangesList[0].id}>
                {exchangesList.map((exchange) => (
                    <Panel 
                        key={exchange.id} 
                        showArrow={false} 
                        header={(
                            <>
                                <Col span={6}>
                                    <Text><strong>{exchange.rank}.</strong></Text>
                                    <Avatar className="exchange-image" src={exchange.iconUrl} />
                                    <Text><strong>{exchange.name}</strong></Text>
                                </Col>
                                <Col span={6}>${millify(exchange.volume)}</Col>
                                <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                <Col span={6}>{millify(exchange.marketShare)}%</Col>
                            </>
                        )}
                    >
                        {HTMLReactParser(exchange.description || '')}
                    </Panel>
                ))}
            </Collapse>
        </>
    )
}

export default Exchanges