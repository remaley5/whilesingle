from sqlalchemy.sql import expression
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.types import DateTime
# note: this is NOT a model. Maybe it doesn't belong here.

# taken from https://docs.sqlalchemy.org/en/13/core/compiler.html#utc-timestamp-function
# used to generate timezone agnostic timestamps
# probably an easier way to do this but it works
# the idea is that we can convert timestamps to user's timezone if they allow us to know location.
# if not, we should default to a particular timezone
# in either case, the difference will be the same (e.g. 'message sent 2 hours ago' is 2 hours ago regardless of timezone)
class utcnow(expression.FunctionElement):
    type = DateTime()

@compiles(utcnow, 'postgresql')
def pg_utcnow(element, compiler, **kw):
    return "TIMEZONE('utc', CURRENT_TIMESTAMP)"
