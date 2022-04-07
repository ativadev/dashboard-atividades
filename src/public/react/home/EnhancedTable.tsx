import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';

interface IData {
	timestamp: string;
	id: string;
	dep: string;
	status: string;
	body: string;
}

const createData = (
	timestamp: string,
	id: string,
	dep: string,
	status: string,
	body: string
): IData => {
	return { timestamp, id, dep, status, body };
};

const randomItem = (array: string[]) => {
	const ind = Math.floor(Math.random() * array.length);
	return array[ind];
};

const rows = (() => {
	const data: IData[] = [];
	const mockDep = [
		'Tecnologia',
		'Marketing',
		'Manutenção',
		'Qualidade',
		'Compras',
		'Faturamento',
	];
	const mockStatus = ['Aberto', 'Em andamento', 'Fechado', 'Pendente'];
	const mockBody = [
		'Impressora explodiu!',
		'Preciso de uma planilha que faça tudo sozinha.',
		'Aumentar o volume da música',
		'Diminuir o volume da música',
		'Mudar as assinaturas de "Bom dia" para "Boa tarde"',
		'Comprar um PC gamer',
		'Estou com lag!',
		'Comprar 2 PCs gamer',
		'Preciso imprimir um livro na impressora colorida',
		'Meu cachorro comeu meu mouse',
		'Perdi meu notebook',
		'A impressora mordeu minha mão',
		'O servidor caiu (no chão)',
		'Preciso de 1 furadeira, 2 HDs, um motor de moto e 2 mil apitos da Due Emme pra amanhã',
		'"PC da empresa roda minecraft?"',
		'Destruí minha planilha sem querer',
		'Destruí a planilha de outro departamento',
		'Apaguei o SGQ',
	];

	let i = 0;
	while (i < 50) {
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

function descendingComparator(a: string, b: string, orderBy: string) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'timestamp',
		numeric: false,
		disablePadding: false,
		label: 'Data',
	},
	{
		id: 'id',
		numeric: false,
		disablePadding: false,
		label: 'ID',
	},
	{
		id: 'dep',
		numeric: false,
		disablePadding: false,
		label: 'Depto.',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'Status',
	},
	{
		id: 'body',
		numeric: false,
		disablePadding: false,
		label: 'Descrição',
	},
];

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{/* orderBy === headCell.id ? (
								<Box component="span">
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null */}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div">
					Nutrition
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('timestamp');
	// const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	// const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	// const handleSelectAllClick = (event) => {
	// 	if (event.target.checked) {
	// 		const newSelecteds = rows.map((n) => n.id);
	// 		setSelected(newSelecteds);
	// 		return;
	// 	}
	// 	setSelected([]);
	// };

	// const handleClick = (event, name) => {
	// 	const selectedIndex = selected.indexOf(name);
	// 	let newSelected = [];
	//
	// 	if (selectedIndex === -1) {
	// 		newSelected = newSelected.concat(selected, name);
	// 	} else if (selectedIndex === 0) {
	// 		newSelected = newSelected.concat(selected.slice(1));
	// 	} else if (selectedIndex === selected.length - 1) {
	// 		newSelected = newSelected.concat(selected.slice(0, -1));
	// 	} else if (selectedIndex > 0) {
	// 		newSelected = newSelected.concat(
	// 			selected.slice(0, selectedIndex),
	// 			selected.slice(selectedIndex + 1)
	// 		);
	// 	}
	//
	// 	setSelected(newSelected);
	// };

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const handleChangeDense = (event) => {
	// 	setDense(event.target.checked);
	// };

	// const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: '100%' }}>
			<TableContainer>
				<Table
					sx={{ minWidth: 750 }}
					aria-labelledby="tableTitle"
					size={'medium'}>
					<EnhancedTableHead
						numSelected={0}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={null}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
					/>
					<TableBody>
						{stableSort(rows, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								// const isItemSelected = isSelected(row.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								const cells = Object.keys(row).map((key, i) => {
									return (
										<TableCell
											component={i > 0 ? 'td' : 'th'}
											id={i > 0 ? null : labelId}
											scope={i > 0 ? null : 'row'}>
											{row[key]}
										</TableCell>
									);
								});

								return (
									<TableRow
										hover
										// onClick={(event) => handleClick(event, row.id)}
										role="checkbox"
										aria-checked={false}
										tabIndex={-1}
										key={row.id}
										selected={false}>
										{cells}
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: 53 * emptyRows,
								}}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
}
