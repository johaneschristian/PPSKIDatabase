from website import create_app
from flask import redirect, url_for

app = create_app()


@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for("views.home"))


if __name__ == "__main__":
    app.run(debug=True)