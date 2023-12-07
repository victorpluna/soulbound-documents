import { Button, Tooltip } from 'antd'
import classNames from 'classnames'
import { Column, Row } from 'react-display-flex'
import { PlusOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import { formatCurrency } from '../../formatters'
import { metaMask } from '../../metamask-connector'
import { minifyAddress } from '../../formatters/web3'

import './web3-header.scss'

export const Web3Header = () => {
  const { account, provider } = useWeb3React();
  const [balance, setBalance] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getContractBalance = useCallback(async () => {
    setIsFetching(true);
    
    const formattedBalance = ethers.utils.formatUnits(await provider.getBalance(account), 18);
    
    setBalance(formattedBalance);
    setIsFetching(false);
  }, [account, provider]);

  useEffect(() => {
    getContractBalance();
  }, [getContractBalance]);


  return (
    <Row className="web3-header" justifyContentSpaceBetween>
      <Row className="web3-header-menu">
        <Button type="text" className="success">
          <Column className={classNames({ 'is-loading': isFetching })} justifyContentStart>
            <span>Balance</span>
            <span>
              <span>
                {formatCurrency({
                  value: balance,
                  minimumPrecision: 3,
                  currency: 'ETH',
                  notation: 'standard',
                })}
              </span>
            </span>
          </Column>
          <PlusOutlined />
        </Button>
        <Tooltip title="Refresh">
          <Button type="text" className="refresh-button" disabled={isFetching} onClick={getContractBalance}>
            {isFetching ? <LoadingOutlined spin /> : <ReloadOutlined />}
          </Button>
        </Tooltip>
      </Row>
      <Row className="web3-header-wallet" alignItemsCenter>
        <Tooltip title={account}>{minifyAddress(account)}</Tooltip>
        <Button type="link" className="confirm-button" onClick={() => metaMask.resetState()}>
          Disconnect
        </Button>
      </Row>
    </Row>
  )
}
