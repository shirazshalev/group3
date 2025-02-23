from flask import Blueprint, render_template

navigationBP = Blueprint(
    'Navigation',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/Navigation'
)
