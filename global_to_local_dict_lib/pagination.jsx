import Link from 'next/link'
import {useEffect} from 'react'
import { useRouter } from 'next/router'


function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : null;

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
function round(value, precision) {
  if (Number.isInteger(precision)) {
    var shift = Math.pow(10, precision);
    // Limited preventing decimal issue
    return (Math.round( value * shift + 0.00000000000001 ) / shift);
  } else {
    return Math.round(value);
  }
} 

export default function Page({page_obj}) {
  const router = useRouter();
  const next_page = getAllUrlParams(page_obj.next);
  const previous_page = getAllUrlParams(page_obj.previous) == undefined ? 1 : getAllUrlParams(page_obj.previous);
  let page_objs=router.query.weight ? router.query.weight : page_obj.results.length
  const outof=(page_obj.count/page_objs)
  const rounded = Math.round(outof)
  const last_page = (rounded >= outof ? rounded : rounded+1)
  useEffect(()=>{
    if(page_obj.next)page_objs=page_obj.results.length
  },[])
  return(
    <div class="pagination">
      <span class="step-links">
    { page_obj.previous ?
    <>
    <button>
      <Link href={`?page=1&search=${previous_page.search}`}>&laquo; first</Link>
    </button>

    <button>
      <Link href={`?page=${previous_page.page ? previous_page.page : 1}&search=${previous_page.search}`}>previous</Link>
    </button>
    </>
    : null }
    <span class="current">
      Page {page_obj.next ? (Number(next_page.page) - 1) : last_page} of {last_page}.
    </span>
    { page_obj.next ?
    <>
    <button>
      <Link href={`?page=${next_page.page}&search=${next_page.search}&weight=${page_objs}`}>next</Link>
    </button>

    <button>
      <Link href={`?page=${last_page}&search=${next_page.search}&weight=${page_objs}`}>last &raquo;</Link>
    </button>
    </>
    : null }
    </span>
    </div>
  )
}




