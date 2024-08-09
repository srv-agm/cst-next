// import React from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import styles from "./styles.module.scss";
// import LoginForm from "../Components/LoginForm";
// import Image from "next/image";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { MenuItemType } from "../Components/Menu";

// function m(menu: MenuItemType[]): string {
//   if (menu[0]?.sub_menu) return m(menu[0]?.sub_menu);
//   return menu[0]?.route + "";
// }

// export default async function Login() {
//   const token = cookies().get("token")?.value;
//   if (token) {
//     const pkg_url = process.env.BASE_API_DOMAIN + "/package-list";
//     const headers = { authorization: token };
//     const pkg_res = await fetch(pkg_url, { headers }).then((r) => r.json());
//     const menu_url =
//       process.env.BASE_API_DOMAIN +
//       "/menu-list?package=" +
//       pkg_res?.data?.at(0)?.value;
//     const menu_res = await fetch(menu_url, { headers }).then((r) => r.json());

//     let route = m(menu_res.menu) + "?package=" + pkg_res?.data?.at(0)?.value;
//     redirect(route);
//   }
//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.logoWrapper}>
//         <Image
//           src="https://infringementportalcontent.mfilterit.com/images/media/logos/mfilterit-white-logo.png"
//           alt="mFilterIt Logo"
//           width={230}
//           height={40}
//         />
//       </div>
//       <Container
//         fluid
//         className={`d-flex align-items-center justify-content-center min-vh-100  ${styles.container}`}
//       >
//         <div className={`${styles.circle} ${styles.circle1}`}></div>
//         <div className={`${styles.circle} ${styles.circle2}`}></div>
//         <div className={`${styles.square} ${styles.square1}`}></div>
//         <Row className="w-100">
//           <Col
//             md={7}
//             className="d-flex flex-column align-items-center justify-content-center p-5"
//           >
//             <div className={styles.infoBox}>
//               <p className={styles.infoText}>
//                 Simplifying Compliance for Digital Brands Our creative and
//                 content compliance solution, Tickr provides automated compliance
//                 regulation across creative and content to reduce errors and
//                 maximize efficiency with brand-compliant creative assets.
//               </p>
//               <a
//                 href="https://www.mfilterit.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button variant="primary">Our Products</Button>
//               </a>
//             </div>
//           </Col>
//           <Col
//             md={5}
//             className="d-flex flex-column align-items-center justify-content-center"
//           >
//             <div className={styles.loginBox}>
//               <h2 style={{ textAlign: "center" }} className={styles.title}>
//                 Login
//               </h2>
//               <LoginForm />
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }
