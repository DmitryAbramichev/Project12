import { Flex, Text } from '@mantine/core';
import logo from '../../assets/image 2.png';
import ellipse from '../../assets/Ellipse 2.svg';
import vector from '../../assets/Vector.svg';

export function Header() {
  return (
    <Flex justify="space-between" align="center" p="xs">
      <Flex gap="xs" align="center">
        <img src={logo} alt="logo" />
        <Text fw={600} size="22px">.FrontEnd</Text>
      </Flex>
      <Flex mr={"45%"} gap="xs" align="center">
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Text fw={500} size="22px">Вакансии FE</Text>
        </a>
        <img src={ellipse} alt="ellipse" />
        <img src={vector} alt="vector" />
        <Text fw={200} size="22px">Обо мне</Text>
      </Flex>
    </Flex>
  );
}