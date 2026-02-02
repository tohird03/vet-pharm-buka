import React from 'react';
import { observer } from 'mobx-react';
import { DataTable } from '@/components/Datatable/datatable';
import { staffsWorkingTimeReportsColumns } from './constants';
import { DatePicker, DatePickerProps, Input, Typography } from 'antd';
import styles from './styles.scss';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { clientsStatisticStore } from '@/stores/clients';

const cn = classNames.bind(styles);

export const ClientStatistic = observer(() => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    clientsStatisticStore.setSearch(e.currentTarget?.value);
  };

  const handleStartDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      clientsStatisticStore.setStartDate(null);
    }
    clientsStatisticStore.setStartDate(new Date(dateString));
  };

  const handleEndDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      clientsStatisticStore.setEndDate(null);
    }
    clientsStatisticStore.setEndDate(new Date(dateString));
  };

  return (
    <main>
      <div className={cn('client-report__head')}>
        <Typography.Title level={3}>Mijozlar hisoboti</Typography.Title>
        <div className={cn('client-report__filter')}>
          <Input
            placeholder="Mijozlarni qidirish"
            allowClear
            onChange={handleSearch}
            className={cn('orders__search')}
          />
          <DatePicker
            className={cn('promotion__datePicker')}
            onChange={handleStartDateChange}
            placeholder={'Boshlanish sanasi'}
            defaultValue={dayjs(clientsStatisticStore.startDate)}
            allowClear={false}
          />
          <DatePicker
            className={cn('promotion__datePicker')}
            onChange={handleEndDateChange}
            placeholder={'Tugash sanasi'}
            defaultValue={dayjs(clientsStatisticStore.endDate)}
            allowClear={false}
          />
        </div>
      </div>

      <DataTable
        columns={staffsWorkingTimeReportsColumns}
        data={[]}
      // data={staffsData?.data?.data || []}
      // loading={loading}
      // isMobile={isMobile}
      // pagination={{
      //   total: staffsData?.data?.totalCount,
      //   current: staffsStore?.pageNumber,
      //   pageSize: staffsStore?.pageSize,
      //   showSizeChanger: true,
      //   onChange: handlePageChange,
      //   ...getPaginationParams(staffsData?.data?.totalCount),
      // }}
      />
    </main>
  );
});
