import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { productsListStore } from '@/stores/products';
import { Table, Typography } from 'antd';
import { singleProductColumns } from './constants';
import classNames from 'classnames/bind';
import { styles } from './single-product.scss';

const cn = classNames.bind(styles);

export const SingleProduct = observer(() => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      setLoading(true);

      productsListStore.getSingleProducts(productId);

      productsListStore.getSingleProductStory({
        productId,
      })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId]);

  return (
    <div>
      <Typography.Title
        className={cn('single-product__name')}
        level={3}
      >
        {productsListStore?.singleProduct?.name}
      </Typography.Title>
      <Typography.Title
        className={cn('single-product__name')}
        level={4}
      >
        Qoldig&apos;i: {productsListStore?.singleProduct?.count}
      </Typography.Title>

      <Table
        columns={singleProductColumns}
        dataSource={productsListStore?.singleProductStory?.products || []}
        bordered
        summary={(pageData) => (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={1} index={0}>
                Jami
              </Table.Summary.Cell>
              <Table.Summary.Cell
                colSpan={3}
                index={1}
                className={cn('total__order')}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {productsListStore?.singleProductStory?.totalSellingCount}
                </div>
              </Table.Summary.Cell>
              <Table.Summary.Cell
                index={2}
                colSpan={3}
                className={cn('total__arrival')}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {productsListStore?.singleProductStory?.totalArrivalCount}
                </div>
              </Table.Summary.Cell>
              <Table.Summary.Cell
                index={3}
                colSpan={3}
                className={cn('total__returning')}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {productsListStore?.singleProductStory?.totalReturningCount}
                </div>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={1} index={0}>
                Umumiy qoldiq
              </Table.Summary.Cell>
              <Table.Summary.Cell
                colSpan={9}
                index={2}
                className={cn('total')}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {productsListStore?.singleProductStory?.actualCount}
                </div>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        )}
        pagination={false}
        loading={loading}
      />

    </div>
  );
});
