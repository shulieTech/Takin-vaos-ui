/**
 * @name
 * @author MingShined
 */
import { ColumnProps } from 'antd/lib/table';
import { CommonTable, defaultColumnProps } from 'racc';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AddEditSystemPageContext, getEntranceInfo } from '../addEditPage';
import { SystemFlowEnum } from '../enum';
import BusinessActivityService from '../service';
interface Props {}
const MiddlewareList: React.FC<Props> = props => {
  const { state } = useContext(AddEditSystemPageContext);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (state.service) {
      queryMiddlewareList();
    }
  }, [state.service]);
  const queryMiddlewareList = async () => {
    const {
      data: { data, success }
    } = await BusinessActivityService.queryMiddleware({
      ...getEntranceInfo(state.serviceList, state.service),
      applicationName: state.app,
      type: state.serviceType,
      linkId: state.service
    });
    if (success) {
      setDataSource(data);
    }
  };
  const getColumns = (): ColumnProps<any>[] => {
    return [
      {
        ...defaultColumnProps,
        title: '中间件类型',
        dataIndex: SystemFlowEnum.中间件类型
      },
      {
        ...defaultColumnProps,
        title: '中间件名称',
        dataIndex: SystemFlowEnum.中间件名称
      },
      {
        ...defaultColumnProps,
        title: '版本号',
        dataIndex: SystemFlowEnum.版本号
      }
    ];
  };
  return (
    <Fragment>
      <CommonTable
        columns={getColumns()}
        dataSource={dataSource}
        rowKey={(row, index) => index.toString()}
      />
    </Fragment>
  );
};
export default MiddlewareList;
