const { ordersServices: services } = require('../../services');
const { httpCode } = require('../../helpers/constants');

// сумма всех заказов/продаж
const getTotalSales = async (req, res, next) => {
  try {
    const totalSalesValue = await services.getTotalSales();

    if (!totalSalesValue || totalSalesValue.length === 0) {
      return res.status(httpCode.NOT_FOUND).json({
        status: 'fail',
        code: httpCode.NOT_FOUND,
        message: 'Not found',
      });
    }

    // console.log(totalSalesValue); // [ { _id: null, totalSales: 14600 } ]

    const totalSales = totalSalesValue.pop().totalSales;

    res.status(httpCode.OK).json({
      status: 'success',
      code: httpCode.OK,
      message: 'Successful operation',
      data: {
        totalSales,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getTotalSales;
