codetest:
	isort .
	black --line-length 79 --preview .
	flake8 . --exclude venv
	mypy --strict --ignore-missing-imports . --exclude venv