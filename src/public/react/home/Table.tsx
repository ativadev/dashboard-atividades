'use strict';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';

interface IData {
	timestamp: string;
	id: string;
	dep: string;
	status: string;
	body: string;
}

const createData = (timestamp: string, id: string, dep: string, status: string, body: string): IData => {
	return { timestamp, id, dep, status, body };
};

const randomItem = (array: string[]) => {
	const ind = Math.floor(Math.random() * array.length);
	return array[ind];
};

const mockData = (() => {
	const data: IData[] = [];
	const mockDep = ['Tecnologia', 'Marketing', 'Manutenção', 'Qualidade', 'Compras', 'Faturamento'];
	const mockStatus = ['Aberto', 'Em andamento', 'Fechado', 'Pendente'];
	const mockBody = [
		'A certificação de metodologias que nos auxiliam a lidar com a utilização de recursos de hardware dedicados pode nos levar a considerar a reestruturação dos paradigmas de desenvolvimento de software.',
		'Do mesmo modo, a preocupação com a TI verde possibilita uma melhor disponibilidade da terceirização dos serviços.',
		'O incentivo ao avanço tecnológico, assim como o crescente aumento da densidade de bytes das mídias talvez venha causar instabilidade dos métodos utilizados para localização e correção dos erros.',
		'No nível organizacional, o comprometimento entre as equipes de implantação causa uma diminuição do throughput das direções preferenciais na escolha de algorítimos.',
		'Ainda assim, existem dúvidas a respeito de como o entendimento dos fluxos de processamento apresenta tendências no sentido de aprovar a nova topologia dos índices pretendidos.',
		'As experiências acumuladas demonstram que a disponibilização de ambientes afeta positivamente o correto provisionamento do bloqueio de portas imposto pelas redes corporativas.',
		'Podemos já vislumbrar o modo pelo qual a necessidade de cumprimento dos SLAs previamente acordados causa impacto indireto no tempo médio de acesso das formas de ação. ',
		'O empenho em analisar a criticidade dos dados em questão acarreta um processo de reformulação e modernização do levantamento das variáveis envolvidas.',
		'Enfatiza-se que a adoção de políticas de segurança da informação não pode mais se dissociar dos requisitos mínimos de hardware exigidos.',
	];

	data.push(createData('DATA', 'ID', 'DEPTO', 'STATUS', 'DESCRIÇÃO'));
	let i = 0;
	while (i < 10) {
		const date = new Date().toLocaleDateString();
		const dep = randomItem(mockDep);
		const status = randomItem(mockStatus);
		const body = randomItem(mockBody);

		const id = `${i + 1}${dep[0]}`;
		data.push(createData(date, id, dep, status, body));
		i++;
	}
	return data;
})();

const HeaderRow = (props: { data: IData }) => {
	const data: IData = props.data;
	console.log('Gerando CABEÇALHO');
	const content = Object.keys(data).map((d) => {
		const value = d ? data[d] : '-';
		return <TableCell>{value}</TableCell>;
	});
	return <TableRow>{content}</TableRow>;
};

const Head = (props: { headerRow: IData }) => {
	const headerRow: IData = props.headerRow;
	return (
		<TableHead>
			<HeaderRow data={headerRow} />
		</TableHead>
	);
};

const Row = (props: { data: IData }) => {
	const data: IData = props.data;
	console.log('Gerando LINHA');
	const content = Object.keys(data).map((d) => {
		const value = d === 'dep' ? <Chip label={data[d]} variant="outlined" /> : data[d];
		return <TableCell>{value}</TableCell>;
	});
	return <TableRow>{content}</TableRow>;
};

const Body = (props: { data: IData[] }) => {
	const data = props.data
		.filter((d, i) => {
			return i > 0;
		})
		.map((d) => {
			return <Row data={d} />;
		});
	return <TableBody>{data}</TableBody>;
};

const DataTable = (props: { data?: IData[] }) => {
	const data = props.data ? props.data : mockData;
	console.table(data);
	return (
		<TableContainer>
			<Table sx={{ minWidth: 650 }}>
				<Head headerRow={data[0]} />
				<Body data={data} />
			</Table>
		</TableContainer>
	);
};

export default DataTable;
