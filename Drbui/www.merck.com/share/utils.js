

///////////////////////////////////////////////////////////////
// Support for form submittal validations
///////////////////////////////////////////////////////////////

/*************************************************************************
 *  Checks a field for data entry errors based on the spec
 *  passed through the arguments.
 *
 *  Returns a count of the errors found.
 *  
 *  Arguments:
 *    - form:       the form element
 *    - inputname:  the name of the input to be tested
 *    - errtag:     id of a <div> that will contain an error
 *                  message
 *    - format:     format specifier, or null.  valid values
 *                  are:
 *                    "email":   test for valid email address format
 *                    "zipcode": test for valid zipcode format
 *                    other:     user-defined format.  a string 
 *                               containing the specification
 *                               for a regular expression
 **************************************************************************/
function countFieldErrors(/*object*/   form,          
                          /*string*/   inputname,     
                          /*string*/   errtag,        
                          /*boolean*/  required,      
                          /*string-or-null*/  format) 
{
  var input = form.elements[inputname];
  var errcount = 0;

  document.getElementById(errtag).innerHTML = "";  //hide any error text from a previous run

  if(required)
  {
    if(input.value.length == 0)
    {
      document.getElementById(errtag).innerHTML = "Required";
      input.focus();
      errcount += 1;
    }
  }

  if(input.value.length > 0 && format != null)
  {
    var filter;  //RegExp

    switch(format)
    {
      case "email":
        filter = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
        break;
      case "zipcode":
        filter = /(^(?!0{5})(\d{5})(?!-?0{4})(-?\d{4})?$)/;
        break;
      default:
        filter = new RegExp(format);
    }

    if( filter.test(input.value) == false )
    {
      document.getElementById(errtag).innerHTML = "Invalid format";
      input.focus();
      errcount += 1;
    }
  }
  
  return errcount;
}

