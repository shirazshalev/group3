from flask import Blueprint, render_template

footerBP = Blueprint(
    'Footer',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/Footer'
)