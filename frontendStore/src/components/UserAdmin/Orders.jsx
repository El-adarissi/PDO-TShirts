// /* eslint-disable no-unused-vars */
// import { Avatar, IconButton, Tooltip, Typography, Card, CardHeader, CardBody } from '@material-tailwind/react';
// import { PencilIcon } from '@heroicons/react/24/solid';

// const Orders = () => {
//   const orderData = {
//     "orderId": 68,
//     "status": "Pending",
//     "totalPrice": 0,
//     "userId": 64,
//     "dateOrdered": null,
//     "Products": [
//       {
//         "id": 3,
//         "name": "Name Brand",
//         "price": 299,
//         "image": "http://localhost:3000/public/uploads/CamScanner-08-06-2022-15.07-(1)_2.jpg-1731324853103.jpeg",
//         "OrderProducts": {
//           "quantity": 1,
//           "size": "",
//           "color": "\"{}\""
//         }
//       },
//       {
//         "id": 14,
//         "name": "bba",
//         "price": 5,
//         "image": "http://localhost:3000/public/uploads/logo.jfif-1731413449191.jpeg",
//         "OrderProducts": {
//           "quantity": 1,
//           "size": "M",
//           "color": "[\"ddd\"]"
//         }
//       }
//     ],
//     "User": {
//       "id": 64,
//       "name": "ElAdarissi",
//       "phone": "0616885680",
//       "Address": "Maroc",
//       "city": "Casablanca"
//     }
//   };

//   // Define table headers
//   const TABLE_HEAD = ["Name", "Phone", "City", "Address", "Product Name","Product Image","Quantity", "Size", "Color"];

//   // Map over the products to create rows
//   const TABLE_ROWS = orderData.Products.map(product => ({
//     userName: orderData.User.name,
//     userPhone: orderData.User.phone,
//     userCity: orderData.User.city,
//     userAddress: orderData.User.Address,
//     productName: product.name,
//     productImg: product.image,
//     quantity: product.OrderProducts.quantity,
//     size: product.OrderProducts.size,
//     color: (() => {
//       try {
//         const parsedColor = JSON.parse(product.OrderProducts.color);
//         if (Array.isArray(parsedColor)) {
//           return parsedColor.join(', ');
//         }
//         return 'N/A';
//       } catch (e) {
//         return 'N/A';  
//       }
//     })(),
//   }));

//   return (
//     <Card className="h-full w-full">
//       <CardHeader floated={false} shadow={false} className="rounded-none">
//         <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
//           <div>
//             <Typography variant="h5" color="blue-gray">
//               Order Details
//             </Typography>
//           </div>
//         </div>
//       </CardHeader>
//       <CardBody className="overflow-scroll px-0">
//         <table className="w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head) => (
//                 <th
//                   key={head}
//                   className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//                 >
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal leading-none opacity-70"
//                   >
//                     {head}
//                   </Typography>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {TABLE_ROWS.map(
//               (
//                 {
//                   userName,
//                   userPhone,
//                   userCity,
//                   userAddress,
//                   productName,
//                   productImg,
//                   quantity,
//                   size,
//                   color
//                 },
//                 index,
//               ) => {
//                 const isLast = index === TABLE_ROWS.length - 1;
//                 const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

//                 return (
//                   <tr key={productName}>
//                     <td className={classes}>
//                       <Typography variant="small" color="blue-gray" className="font-normal">
//                         {userName}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography variant="small" color="blue-gray" className="font-normal">
//                         {userPhone}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography variant="small" color="blue-gray" className="font-normal">
//                         {userCity}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography variant="small" color="blue-gray" className="font-normal">
//                         {userAddress}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography variant="small" color="blue-gray" className="font-normal">
//                         {productName}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography variant="small" color="blue-gray" className="font-normal">
//                       <Avatar
//                           src={productImg}
//                           alt={productImg}
//                           size="md"
//                           className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
//                         />
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography variant="small" color="blue-gray" className="font-normal">
//                         {quantity}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography variant="small" color="blue-gray" className="font-normal">
//                         {size}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography variant="small" color="blue-gray" className="font-normal">
//                         {color}
//                       </Typography>
//                     </td>
//                   </tr>
//                 );
//               },
//             )}
//           </tbody>
//         </table>
//       </CardBody>
//     </Card>
//   );
// };

// export default Orders;





/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Avatar, Typography, Card, CardHeader, CardBody } from '@material-tailwind/react';
import axios from 'axios';

const Orders = () => {
  const [orderData, setOrderData] = useState([]); // State to store all orders

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/orders')
      .then(response => {
        setOrderData(response.data); // Store the fetched data in state
      })
      .catch(error => {
        console.error('Error fetching order data:', error);
      });
  }, []);

  // Ensure data is available before rendering the table
  if (!orderData || orderData.length === 0) {
    return <div>Loading...</div>; // Loading state while data is being fetched or is undefined
  }

  // Define table headers
  const TABLE_HEAD = ["Order ID", "Name", "Phone", "City", "Address", "Product Name", "Product Image", "Quantity", "Size", "Color","totalPrice"];

  // Flatten all products into one array to display all orders in one table
  const TABLE_ROWS = orderData.flatMap(order => 
    order.Products.map(product => ({
      orderId: order.orderId,
      userName: order.User.name,
      userPhone: order.User.phone,
      userCity: order.User.city,
      userAddress: order.User.Address,
      productName: product.name,
      productImg: product.image,
      quantity: product.OrderProducts.quantity,
      size: product.OrderProducts.size,
      totalPrice:order.totalPrice,
      color: (() => {
        try {
          const parsedColor = JSON.parse(product.OrderProducts.color);
          if (Array.isArray(parsedColor)) {
            return parsedColor.join(', ');
          }
          return 'N/A';
        } catch (e) {
          return 'N/A';  
        }
      })(),
    }))
  );

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Order Details
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  orderId,
                  userName,
                  userPhone,
                  userCity,
                  userAddress,
                  productName,
                  productImg,
                  quantity,
                  size,
                  color,
                  totalPrice
                },
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={orderId}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {orderId}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {userName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {userPhone}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {userCity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {userAddress}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {productName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Avatar
                        src={productImg}
                        alt={productName}
                        size="md"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {size}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {color}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {totalPrice}
                      </Typography>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default Orders;
