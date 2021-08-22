from website import create_app
from flask import redirect, url_for
import os

port = int(os.environ.get('PORT', 5000))
app = create_app()


# Handler if user attempts to access non-existing sites
@app.errorhandler(404)
def page_not_found(e):
    return redirect("/"), 404


if __name__ == "__main__":
    app.run(debug=False, port=port)