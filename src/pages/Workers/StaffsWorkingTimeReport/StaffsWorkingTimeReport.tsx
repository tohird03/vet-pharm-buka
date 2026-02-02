import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { DataTable } from '@/components/Datatable/datatable';
import { staffsWorkingTimeReportsColumns } from './constants';
import { DatePicker, DatePickerProps, Input, Select, Typography } from 'antd';
import styles from './styles.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import { staffsApi } from '@/api/staffs';
import { staffsWorkingTimeStore } from '@/stores/workers';
import dayjs from 'dayjs';

const cn = classNames.bind(styles);

export const StaffsWorkingTimeReport = observer(() => {
  const { data: sellerData, isLoading: loadingSeller } = useQuery({
    queryKey: ['getSellers'],
    queryFn: () =>
      staffsApi.getStaffs({
        pageNumber: 1,
        pageSize: 1000,
      }),
  });

  const handleChangeSeller = (value: string) => {
    if (value) {
      staffsWorkingTimeStore.setSellerId(value);

      return;
    }

    staffsWorkingTimeStore.setSellerId(null);
  };

  const handleStartDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      staffsWorkingTimeStore.setStartDate(null);
    }
    staffsWorkingTimeStore.setStartDate(new Date(dateString));
  };

  const handleEndDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      staffsWorkingTimeStore.setEndDate(null);
    }
    staffsWorkingTimeStore.setEndDate(new Date(dateString));
  };

  const sellerOptions = useMemo(() => (
    sellerData?.data?.data.map((sellerData) => ({
      value: sellerData?.id,
      label: `${sellerData?.fullname}`,
    }))
  ), [sellerData]);

  return (
    <main>
      <div className={cn('time-report__head')}>
        <Typography.Title level={3}>Xodimlarning faollik hisoboti</Typography.Title>
        <div className={cn('time-report__filter')}>
          <Select
            options={sellerOptions}
            onChange={handleChangeSeller}
            className={cn('time-report__search')}
            placeholder="Sotuvchilar"
            loading={loadingSeller}
            allowClear
          />
          <DatePicker
            className={cn('promotion__datePicker')}
            onChange={handleStartDateChange}
            placeholder={'Boshlanish sanasi'}
            defaultValue={dayjs(staffsWorkingTimeStore.startDate)}
            allowClear={false}
          />
          <DatePicker
            className={cn('promotion__datePicker')}
            onChange={handleEndDateChange}
            placeholder={'Tugash sanasi'}
            defaultValue={dayjs(staffsWorkingTimeStore.endDate)}
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
