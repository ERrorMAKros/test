import { LS_CATALOG_ID } from "../../controller/constants/Environment";
import LocalStorageAdaptor from "../../controller/helpers/LocalStorageAdaptor";
import _ from "lodash";

export const CATALOG_INIT = 'Catalog.INIT' ;
export const CATALOG_ADD = 'Catalog.ADD' ;
export const CATALOG_REMOVE = 'Catalog.REMOVE' ;
export const CATALOG_CLEAR = 'Catalog.CLEAR' ;
export const CATALOG_FETCH = 'Catalog.FETCH' ;
export const CATALOG_INFO = 'Catalog.INFO' ;

export function fetchCatalog() {
	const fetchLocalStorage = function(items) {
		LocalStorageAdaptor.set( LS_CATALOG_ID, items ) ;
	}
	return { type: CATALOG_FETCH, fetchLocalStorage } ;
}
export function updateCatalogInfo() {
	const calculator = function(items) {
		const itemsAmount = items.length ;

		let sum = 0 ;
		_.forEach( items || [], (value)=> sum += parseFloat( value.price ) ) ;
		const priceSum = parseFloat(sum).toFixed(3) ;
		
		/** ToDo: https://otvet.mail.ru/question/5734871 */
		let priceAverage = parseFloat( sum / itemsAmount ) ;
		priceAverage = _.isNaN( priceAverage ) ? 0.000 : priceAverage.toFixed(3) ;
		
		return {
			itemsAmount,
			priceSum ,
			priceAverage
		}
	}
	return { type: CATALOG_INFO, calculator } ;
}
export function initCatalog() {
	const data = LocalStorageAdaptor.get( LS_CATALOG_ID ) ;
	return (dispatch) => {
		dispatch({ type: CATALOG_INIT, data }) ;
		dispatch( updateCatalogInfo() ) ;
	}
}
export function addICatalogItems(data) {
	const items = LocalStorageAdaptor.get( LS_CATALOG_ID ) || [] ;
	LocalStorageAdaptor.set( LS_CATALOG_ID, { ...items, ...data } ) ;
	return (dispatch) => {
		dispatch({ type: CATALOG_ADD, data }) ;
		dispatch( updateCatalogInfo() ) ;
		dispatch( fetchCatalog() ) ;
	}
}
export function removeCatalogItem(id) {
	return (dispatch) => {
		dispatch({ type: CATALOG_REMOVE, id }) ;
		dispatch( updateCatalogInfo() ) ;
		dispatch( fetchCatalog() ) ;
	}
}
export function removeAllCatalogItems() {
	return (dispatch) => {
		dispatch({ type: CATALOG_CLEAR }) ;
		dispatch( updateCatalogInfo() ) ;
		dispatch( fetchCatalog() ) ;
	}
}