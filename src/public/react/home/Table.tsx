'use strict';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface IData {
	timestamp: Date;
	id: string;
	dep: string;
	status: string;
}

const createData = (timestamp, id, dep, status): IData => {
	return { timestamp, id, dep, status };
};

const mockData = (() => {
	const data = [];
	const mockDep = ['Tecnologia', 'Qualidade', 'Compras', 'Faturamento'];
	const mockStatus = ['Aberto', 'Em andamento', 'Fechado', 'Pendente'];
	data.push(createData('DATA', 'ID', 'DEPTO', 'STATUS'));
	let i = 0;
	while (i < 20) {
		const date = new Date().toLocaleString();
		const seed = Math.floor(Math.random() * 3);
		const dep = mockDep[seed];
		const status = mockStatus[seed];

		const id = i + dep[0];
		data.push(createData(date, id, dep, status));
		i++;
	}
	return data;
})();

const Row = (props: { data: IData }) => {
	const data: IData = props.data;
	console.log('Gerando LINHA');
	console.table(data);
	const content = Object.keys(data).map((d) => {
		return <TableCell>{data[d]}</TableCell>;
	});
	return <TableRow>{content}</TableRow>;
};

const Head = (props: { headerRow: IData }) => {
	const headerRow: IData = props.headerRow;
	return (
		<TableHead>
			<Row data={headerRow} />
		</TableHead>
	);
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
