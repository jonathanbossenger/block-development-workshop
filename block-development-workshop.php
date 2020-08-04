<?php
/**
 * Plugin Name:     Block Development Workshop
 * Plugin URI:      https://jonathanbossenger.com
 * Description:     Take an existing plugin, and add some blocks
 * Author:          Jonathan Bossenger
 * Author URI:      https://jonathanbossenger.com
 * Text Domain:     block-development-workshop
 * Domain Path:     /languages
 * Version:         0.0.1
 *
 * @package         Block_Development_Workshop
 */

function bdw_error_log( $message, $data = '' ) {
	$file = trailingslashit( plugin_dir_path( __FILE__ ) ) . 'log/' . date( 'Y-m-d' ) . '.log';
	if ( ! is_file( $file ) ) {
		file_put_contents( $file, '' );
	}
	if ( ! empty( $data ) ) {
		$message = array( $message => $data );
	}
	$data_string = print_r( $message, true ) . "\n";
	file_put_contents( $file, $data_string, FILE_APPEND );
}

/**
 * Creates the custom table on plugin activation
 */
register_activation_hook( __FILE__, 'bdw_create_table' );
function bdw_create_table() {
	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	global $wpdb;

	$table_name   = $wpdb->prefix . 'subscribers';
	$wpdb_collate = $wpdb->collate;
	$sql          = "CREATE TABLE {$table_name} (
		                id mediumint(11) unsigned NOT NULL auto_increment,
		                status varchar(100) NULL,
		                email varchar(100) NULL,
		                name varchar(100) NULL,
		                PRIMARY KEY  (id)
		            )
		            COLLATE {$wpdb_collate}";

	dbDelta( $sql );
}

/**
 * A simple form shortcode
 * https://developer.wordpress.org/reference/functions/add_shortcode/
 */
add_shortcode( 'bdw_form_shortcode', 'bdw_form_shortcode' );
function bdw_form_shortcode() {
	ob_start();
	?>
	<h1>Subscribe</h1>
	<form method="post">
		<input type="hidden" name="bdw_form" value="submit">
		<div>
			<label for="email">Email address</label>
			<input type="text" id="email" name="email" placeholder="Email address">
		</div>
		<div>
			<label for="name">Name</label>
			<input type="text" id="name" name="name" placeholder="Name">
		</div>
		<div>
			<input type="submit" id="submit" name="submit" value="Submit">
		</div>
	</form>
	<?php
	$form = ob_get_clean();
	return $form;
}

/**
 * Processing the form data
 * https://developer.wordpress.org/reference/hooks/wp/
 */
add_action( 'wp', 'bdw_process_form' );
function bdw_process_form() {
	//@todo homework: learn about and implement nonce checking
	if ( ! isset( $_POST['bdw_form'] ) ) { //phpcs:ignore WordPress.Security
		return;
	}
	$bdw_form = $_POST['bdw_form']; //phpcs:ignore WordPress.Security.NonceVerification
	if ( ! empty( $bdw_form ) && 'submit' === $bdw_form ) {
		$email          = $_POST['email']; //phpcs:ignore WordPress.Security.NonceVerification
		$name           = $_POST['name']; //phpcs:ignore WordPress.Security.NonceVerification
		$subscriber_data = array(
			'status'        => 'subscribed',
			'name'          => $name,
			'email_address' => $email,
		);
		$added = bdw_insert_subscriber( $subscriber_data );
	}
}

/**
 * Adds a subscriber to the database table
 *
 * @param $subscriber_data
 *
 * @return bool
 */
function bdw_insert_subscriber( $subscriber_data ) {
	if ( empty( $subscriber_data['email'] ) ) {
		return false;
	}
	global $wpdb;

	$table_name = $wpdb->prefix . 'subscribers';

	$rows = $wpdb->insert(
		$table_name,
		$subscriber_data
	);

	if ( 1 === $rows ) {
		return true;
	}

	bdw_error_log( 'Failed adding subscriber to database', $subscriber_data );

	return false;
}
