import { Injectable } from '@angular/core'
import { saveAs } from 'file-saver'
import * as ExcelJS from 'exceljs/dist/exceljs.min.js'

@Injectable({
	providedIn: 'root'
})
export class ExcelService {

	constructor() { }

	createExcel(excelData: any) {

		let title = excelData.title
		let headers = excelData.headers
		let widths = excelData.widths
		let data = excelData.data
		let colNo = ['F4', 'G4', 'H4', 'I4', 'L4', 'M4', 'N4', 'J4', 'K4', 'O4', 'P4']
		let workbook = new ExcelJS.Workbook()
		let worksheet = workbook.addWorksheet('Sheet1')

		worksheet.mergeCells('A1', 'E2')
		let titleRow = worksheet.getCell('A1')
		titleRow.value = title
		titleRow.font = {
			name: 'Calibri',
			size: 13,
			bold: true,
			color: { argb: '0085A3' }
		}
		titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

		for (let i = 0; i < headers.length; i++) {
			let headerRow = worksheet.addRow(headers[i])
			headerRow.eachCell((cell: any) => {
				cell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: '4167B8' },
					bgColor: { argb: '' }
				}
				cell.font = {
					bold: true,
					color: { argb: 'FFFFFF' },
					size: 12
				}
			})
		}

		data.forEach((d: any) => {
			worksheet.addRow(d)
		})

		for (let i = 0; i < widths.length; i++) {
			worksheet.columns[i].width = widths[i]
		}


		workbook._worksheets[1]._rows[3]._cells.filter((item : any) => colNo.includes(item._address)).forEach((element : any) => {
			element.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'f79102' }
			};
		});

		return workbook
	}

	generateExcel(workbook: any, title: string) {
		return workbook.xlsx.writeBuffer().then((data: any) => {
			let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
			saveAs(blob, title + '.xlsx')
		})
	}

}
